import { UpdateTaskForm } from '@/components/UpdateTaskForm';

const TaskByIdPage = ({ params }: { params: { id: string } }) => {
	return (
		<>
			<UpdateTaskForm taskId={params.id} />
		</>
	);
};
export default TaskByIdPage;
