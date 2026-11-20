import { hourSlip, swappedHands } from "./distractors";
import { formatTime, sameTime } from "./time";
import type { ClockTime, DistractorKind, Level } from "./types";
import { t } from "$lib/i18n";

/**
 * Work out which mistake a typed answer represents, so a Hard Question can give
 * the same tailored correction a multiple-choice Question does.
 */
export function classify(
  answer: ClockTime,
  time: ClockTime,
  level: Level,
): DistractorKind | null {
  if (sameTime(answer, hourSlip(time))) return "hour-slip";
  if (sameTime(answer, swappedHands(time, level))) return "swapped-hands";

  // A miscount keeps the hour and misses the minute. Which wording helps
  // depends on how far out they were: a tick or two is a tick-counting slip,
  // a clean multiple of five is a counting-by-fives slip.
  if (answer.hour === time.hour) {
    const gap = Math.abs(answer.minute - time.minute);
    const minutesOut = Math.min(gap, 60 - gap);
    if (minutesOut > 0 && minutesOut <= 2) return "off-by-tick";
    if (minutesOut > 0 && minutesOut % 5 === 0) return "off-by-five";
  }
  return null;
}

function nextHour(hour: number): number {
  return (hour % 12) + 1;
}

/** Explain the relevant hands using the numbers on this Question's Clock Face. */
export function explain(kind: DistractorKind | null, time: ClockTime): string {
  const answer = t("feedback.time_is", { time: formatTime(time) });
  const hourAdvice =
    time.minute === 0
      ? t("feedback.hour_on_hour", { hour: time.hour })
      : t("feedback.hour_between", {
          hour: time.hour,
          next: nextHour(time.hour),
        });

  let minuteAdvice: string;
  if (time.minute === 0) {
    minuteAdvice = t("feedback.minute_on_12");
  } else if (time.minute % 5 === 0) {
    minuteAdvice = t("feedback.minute_fives", {
      num: time.minute / 5,
      minute: time.minute,
    });
  } else {
    const wholeFives = Math.floor(time.minute / 5);
    const ticks = time.minute % 5;
    const startNumber = wholeFives === 0 ? 12 : wholeFives;
    minuteAdvice = t("feedback.minute_ticks", {
      ticks,
      ticks_word: ticks === 1 ? t("feedback.tick_one") : t("feedback.tick_many"),
      start: startNumber,
      whole: wholeFives * 5,
      minute: time.minute,
    });
  }

  if (kind === "hour-slip") return `${hourAdvice} ${answer}`;
  if (kind === "swapped-hands") {
    return `${t("feedback.swapped_prefix")} ${hourAdvice} ${minuteAdvice} ${answer}`;
  }
  if (kind === "hour-and-minute" || kind === null) {
    return `${hourAdvice} ${minuteAdvice} ${answer}`;
  }
  return `${minuteAdvice} ${answer}`;
}
