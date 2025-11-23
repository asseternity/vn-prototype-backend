import { Event } from "../utils/master_types";

import { test_event } from "../events/test_event";

// put events into a lookup map
export const events_lookup: Record<string, Event> = {
  [test_event.id]: test_event,
};
