import Table from "../Table";
import { mockTimetable, mockClassEntries } from "../MOCK_DATA";

export default function ClassTimetable() {
  return (
    <Table 
      entries={mockClassEntries}
      slotCount={mockTimetable.slots}
      days={mockTimetable.days}
      mode="class"
    />
  );
}
