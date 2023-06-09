import { TasksContext } from "@/contexts/tasks";
import { useContext } from "react";

export const useTasksContext = () => useContext(TasksContext)