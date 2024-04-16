import { useDispatch } from 'react-redux';
import { closeDeleteModal, closeModal } from '../../store/modalSlice/modalSlice';
import { deleteBlog } from '../../api/internal';
import styles from './DeleteModel.module.css'

const DeleteModal = ({id, deleteBlogHandler}) => {
  const dispatch = useDispatch();
  return (
    <aside className={styles.modalContainer}>
      <div className={styles.modal}>
        <h4>Do you really want to delete this blog?</h4>
        <div className={styles.btnContainer}>
          <button
            type='button'
            className={styles.confirmBtn}
            onClick={() => {
                deleteBlogHandler(id);
              dispatch(closeDeleteModal());
            }}
          >
            confirm
          </button>
          <button
            type= 'button'
            className={styles.cancelBtn}
            onClick={() => {
              dispatch(closeDeleteModal());
            }}
          >
            cancel
          </button>
        </div>
      </div>
    </aside>
  );
};
export default DeleteModal;
