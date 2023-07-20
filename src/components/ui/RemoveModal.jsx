import { Modal, Button } from '@components/ui';

function RemoveModal({ title, content, closeText, removeText, handleModalClose, handleDeleteClick }) {
    return (
        <Modal handleModalClose={handleModalClose}>
            <div className='RemoveModal__head'>
                <h4 className='RemoveModal__title'>{title}</h4>
            </div>
            <div className='RemoveModal__body'>
                <p className='RemoveModal__content'>{content}</p>
            </div>
            <div className='RemoveModal__foot'>
                <Button className='RemoveModal__button-close' tertiary onClick={handleModalClose}>{closeText}</Button>
                <Button className='RemoveModal__button-remove' danger onClick={handleDeleteClick}>{removeText}</Button>
            </div>
        </Modal>
    );
}

export default RemoveModal;