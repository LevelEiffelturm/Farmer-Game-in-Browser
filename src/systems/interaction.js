export function interact(actor, object) {
  object?.interact?.(actor);
}
