import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import các hàm API event phù hợp
import { deleteEvent, getEvents } from "@/apis/event.api";
import { DataTable } from "@/components/data-table";
import { columns } from "./event-column";
import CreateEventDialog from "./create-event-dialog";
import { useProfileStore } from "@/store/profileStore";
import { toast } from "sonner";

const EventTable = () => {
  const { profile } = useProfileStore();
  const { data: events } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Event deleted successfully");
      
    },
    onError: () => {
      toast.error("Failed to delete event");
    },
  });

  return (
    <div className="mx-4 mt-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Event Management
          </h1>
          <p className="text-muted-foreground">Manage your donation events</p>
        </div>
        {profile?.role === "STAFF" ? (
          <CreateEventDialog />
        ) : (
          <p className="text-muted-foreground">Only staffs can create events</p>
        )}
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
