import * as React from 'react';
import styles from './CreateAdvModal.module.css';
import { useState } from 'react';
import { useAppDispatch } from '../../store/store.ts';
import { addNewAdvertisement } from '../../store/features/advSlice.ts';

type CreateAdvModalProps = {
  closeModal: () => void;
};

const CreateAdvModal: React.FC<CreateAdvModalProps> = ({ closeModal }) => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !price) {
      alert('Пожалуйста, введите название и стоимость!');
      return;
    }

    const newAd = {
      id: Date.now().toString(),
      name: title,
      description: description || '',
      price: Number(price),
      imageUrl: imageUrl || '',
      createdAt: new Date().toISOString(),
      views: 0,
      likes: 0,
    };

    dispatch(addNewAdvertisement(newAd));

    closeModal();
  };

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContent}>
        <h2 className={styles.title}>Создать новое объявление</h2>
        <form className={styles.advForm} onSubmit={handleSubmit}>
          <label className={styles.label}>
            Картинка (URL):
            <input
              className={styles.input}
              type="text"
              placeholder="URL изображения"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </label>

          <label className={styles.label}>
            Название:
            <input
              className={styles.input}
              type="text"
              placeholder="Введите название"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <label className={styles.label}>
            Описание:
            <textarea
              className={styles.textArea}
              placeholder="Введите описание"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          <label className={styles.label}>
            Стоимость:
            <input
              className={styles.input}
              type="number"
              placeholder="Введите стоимость"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </label>

          <div className={styles.modalButtons}>
            <button type="submit">Создать</button>
            <button type="button" onClick={closeModal}>
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAdvModal;
