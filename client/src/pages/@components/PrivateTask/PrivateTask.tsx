import type { TaskModel } from '$/api/@types/models';
import { useState, type ChangeEvent } from 'react';
import { apiClient } from 'src/utils/apiClient';
import { returnNull } from 'src/utils/returnNull';
import styles from './PrivateTask.module.css';

export const PrivateTask = (props: { task: TaskModel; fetchTasks: () => Promise<void> }) => {
  const { task } = props;
  const [editingTaskId, setEditingTaskId] = useState<string>();
  const [editingLabel, setEditingLabel] = useState('');
  const isEditing = editingTaskId === task.id;

  const editLabel = (e: ChangeEvent<HTMLInputElement>) => {
    setEditingLabel(e.target.value);
  };
  const toggleDone = async () => {
    await apiClient.private.tasks
      .patch({ body: { taskId: task.id, done: !task.done, label: task.label } })
      .catch(returnNull);
    await props.fetchTasks();
  };
  const deleteTask = async () => {
    await apiClient.private.tasks.delete({ body: { taskId: task.id } }).catch(returnNull);
    await props.fetchTasks();
  };
  const updateTaskLabel = async () => {
    await apiClient.private.tasks
      .patch({ body: { taskId: task.id, done: task.done, label: editingLabel } })
      .catch(returnNull);
    setEditingTaskId(undefined);
    setEditingLabel('');
    await props.fetchTasks();
  };
  const startEditTask = () => {
    setEditingTaskId(task.id);
    setEditingLabel(task.label);
  };

  return (
    <label>
      <div className={styles.editGroup}>
        <input type="checkbox" checked={task.done} onChange={toggleDone} />
        {isEditing ? (
          <input
            type="text"
            value={editingLabel}
            className={styles.labelInput}
            onChange={editLabel}
          />
        ) : (
          <span>{task.label}</span>
        )}
      </div>
      <div className={styles.btnGroup}>
        <input type="button" value="DELETE" className={styles.btn} onClick={deleteTask} />
        {isEditing ? (
          <input type="button" value="SAVE" className={styles.btn} onClick={updateTaskLabel} />
        ) : (
          <input type="button" value="EDIT" className={styles.btn} onClick={startEditTask} />
        )}
      </div>
    </label>
  );
};
