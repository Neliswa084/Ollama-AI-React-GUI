import type { MessageStats, OllamaResponse } from '../types'

const NANOSECONDS_PER_SECOND = 1_000_000_000

function nsToSeconds(ns: number): number {
  return ns / NANOSECONDS_PER_SECOND
}

export function getStats(data: OllamaResponse): MessageStats {
  const evalSeconds = nsToSeconds(data.eval_duration)

  return {
    totalDuration: nsToSeconds(data.total_duration),
    tokensPerSecond: evalSeconds > 0 ? data.eval_count / evalSeconds : 0,
  }
}