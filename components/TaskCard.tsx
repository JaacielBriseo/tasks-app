import { Task } from '@/types';

interface Props {
	task: Task;
}
export const TaskCard: React.FC<Props> = ({ task }) => {
	return <div>{task.description}</div>;
};
