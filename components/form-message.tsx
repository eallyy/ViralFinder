import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/20/solid'

export type Message =
  | { success: string }
  | { error: string }
  | { warning: string }
  | { message: string };

export function FormMessage({ message }: { message: Message }) {
  return (
    "success" in message || "error" in message || "warning" in message || "message" in message ? (
    <Alert variant="default">
      { "error" in message ? <ExclamationCircleIcon className="h-4 w-4" /> : "" }
      { "success" in message ? <CheckCircleIcon className="h-4 w-4" /> : "" }
      { "warning" in message ? <ExclamationTriangleIcon className="h-4 w-4" /> : "" }
      <AlertTitle>{"success" in message ? "Success" : "error" in message ? "Error" : "message" in message ? "Message" : "warning" in message ? "Warning" : ""}</AlertTitle>
      <AlertDescription>
      {"success" in message ? message.success : "error" in message ? message.error : "message" in message ? message.message : "warning" in message ? message.warning : ""}
      </AlertDescription>
    </Alert>) : "" 
  );
}

