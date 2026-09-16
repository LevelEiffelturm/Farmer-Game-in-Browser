export function cleanupGameObjects(world) {
  world.objects.outdoor = world.objects.outdoor.filter(
    (object) => !object.destroyed,
  );

  world.objects.indoor = world.objects.indoor.filter(
    (object) => !object.destroyed,
  );
}
