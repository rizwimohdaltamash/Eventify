import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Mail, User, Edit, Trash2, Plus, AlertTriangle } from 'lucide-react'
import { deleteAttendee } from '@/api/attendees'
import { Button } from './ui/button'
import { useToast } from '@/hooks/use-toast'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import AttendeeForm from './AttendeeForm'

export default function AttendeeList({ eventId, attendees }) {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedAttendee, setSelectedAttendee] = useState(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [attendeeToDelete, setAttendeeToDelete] = useState(null)
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: deleteAttendee,
    // Optimistic update for delete
    onMutate: async (deletedAttendeeId) => {
      await queryClient.cancelQueries(['events'])
      
      const previousEvents = queryClient.getQueryData(['events'])
      
      // Optimistically remove the attendee
      queryClient.setQueryData(['events'], (old) => {
        return old?.map((event) => {
          if (event.id === eventId) {
            return {
              ...event,
              attendees: event.attendees?.filter((a) => a.id !== deletedAttendeeId),
            }
          }
          return event
        })
      })
      
      return { previousEvents }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['events'])
      toast({
        title: 'Success',
        description: 'Attendee removed successfully',
      })
    },
    onError: (error, deletedAttendeeId, context) => {
      // Roll back on error
      queryClient.setQueryData(['events'], context.previousEvents)
      toast({
        title: 'Error',
        description: error.response?.data?.error || 'Failed to remove attendee',
        variant: 'destructive',
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries(['events'])
    },
  })

  const handleDelete = (attendeeId) => {
    setAttendeeToDelete(attendeeId)
    setDeleteConfirmOpen(true)
  }

  const confirmDelete = () => {
    if (attendeeToDelete) {
      deleteMutation.mutate(attendeeToDelete)
      setDeleteConfirmOpen(false)
      setAttendeeToDelete(null)
    }
  }

  const cancelDelete = () => {
    setDeleteConfirmOpen(false)
    setAttendeeToDelete(null)
  }

  const handleEdit = (attendee) => {
    setSelectedAttendee(attendee)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setSelectedAttendee(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Attendees</h3>
        <Button size="sm" onClick={() => setIsFormOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Attendee
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendees?.map((attendee) => (
            <TableRow key={attendee.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  {attendee.name}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  {attendee.email}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(attendee)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(attendee.id)}
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AttendeeForm
        open={isFormOpen}
        onClose={handleCloseForm}
        eventId={eventId}
        attendee={selectedAttendee}
      />

      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <DialogTitle className="text-xl">Remove Attendee</DialogTitle>
            </div>
            <DialogDescription className="pt-3 text-base">
              Are you sure you want to remove this attendee from the event? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={cancelDelete}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={confirmDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? 'Removing...' : 'Remove Attendee'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
