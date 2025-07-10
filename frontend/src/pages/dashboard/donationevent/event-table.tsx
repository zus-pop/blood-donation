import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import các hàm API event phù hợp
import { deleteEvent, getEvents } from "@/apis/event.api";
import { DataTable } from "@/components/data-table";
import { columns } from "./event-column";
import CreateEventDialog from "./create-event-dialog";

const EventTable = () => {
  const { data: events } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Event Management
          </h1>
          <p className="text-muted-foreground">Manage your donation events</p>
        </div>
        <CreateEventDialog />
      </div>
      <DataTable
        filter="title"
        columns={columns({
          onDelete: mutate,
        })}
        data={events ?? []}
      />
    </div>
  );
};

export default EventTable;
