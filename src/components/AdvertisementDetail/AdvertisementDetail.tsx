import * as React from 'react';
import styles from './AdvertisementDetail.module.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { formatTime } from '../../utils/formatTime.ts';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import {
  deleteExistingAdvertisement,
  getAdvertisementById,
  updateExistingAdvertisement,
} from '../../store/features/advSlice.ts';
import { Advertisment } from '../../../types.ts';
import cn from 'classnames';

const AdvertisementDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { selectedAdvertisement, loading, error } = useAppSelector(
    (state) => state.advertisement,
  );

  const [isEditing, setIsEditing] = useState(false);
  const [editedFields, setEditedFields] = useState<Partial<Advertisment>>({});

  useEffect(() => {
    if (id) {
      dispatch(getAdvertisementById(id));
    }
  }, [dispatch, id]);

  const handleFieldChange = (field: keyof Advertisment, value: any) => {
    setEditedFields((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (id && Object.keys(editedFields).length > 0) {
      dispatch(updateExistingAdvertisement({ id, data: editedFields }));
      setIsEditing(false);
      setEditedFields({});
    }
  };

  const handleDelete = () => {
    if (id) {
      dispatch(deleteExistingAdvertisement(id))
        .then(() => {
          navigate('/advertisements');
        })
        .catch((error) => {
          console.error('Ошибка при удалении:', error);
        });
    }
  };

  if (error) {
    return (
      <div className={styles.error}>
        <p className={styles.errorMessage}>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.detail}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.infoBox}>
            {isEditing ? (
              <>
                <input
                  className={cn(styles.input, styles.inputTitle)}
                  type="text"
                  defaultValue={selectedAdvertisement?.name}
                  onChange={(e) => handleFieldChange('name', e.target.value)}
                  placeholder="Название"
                />
                <input
                  className={cn(styles.inputPrice, styles.input)}
                  type="number"
                  defaultValue={selectedAdvertisement?.price}
                  onChange={(e) =>
                    handleFieldChange('price', Number(e.target.value))
                  }
                  placeholder="Цена"
                />
              </>
            ) : (
              <>
                <h1 className={styles.title}>
                  {loading ? (
                    <Skeleton width={400} />
                  ) : (
                    selectedAdvertisement?.name
                  )}
                </h1>
                <p className={styles.price}>
                  {loading ? (
                    <Skeleton width={200} />
                  ) : (
                    `${selectedAdvertisement?.price} ₽`
                  )}
                </p>
              </>
            )}
          </div>
          <div className={styles.bottom}>
            <p className={styles.date}>
              {loading ? (
                <Skeleton width={150} />
              ) : (
                `Создан: ${formatTime(selectedAdvertisement?.createdAt!)}`
              )}
            </p>
            {isEditing ? (
              <div className={styles.buttonWrapper}>
                <div className={styles.buttonBox}>
                  <button
                    onClick={handleSave}
                    className={cn(styles.button, styles.saveButton)}
                  >
                    Сохранить
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className={cn(styles.button, styles.cancelButton)}
                  >
                    Отмена
                  </button>
                </div>
                <div>
                  <button
                    className={cn(styles.button, styles.deleteButton)}
                    onClick={handleDelete}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className={styles.button}
              >
                Редактировать
              </button>
            )}
          </div>
        </div>
        <div className={styles.section}>
          {loading ? (
            <Skeleton width={450} height={450} borderRadius={20} />
          ) : isEditing ? (
            <div className={styles.editImage}>
              <p className={styles.descriptionTitle}>URL изображения</p>
              <textarea
                className={styles.textarea}
                value={
                  editedFields.imageUrl || selectedAdvertisement?.imageUrl || ''
                }
                onChange={(e) => handleFieldChange('imageUrl', e.target.value)}
                placeholder="Введите URL изображения"
              />
            </div>
          ) : (
            <img
              className={styles.image}
              src={
                selectedAdvertisement?.imageUrl ||
                'https://via.placeholder.com/450'
              }
              alt="Product Image"
            />
          )}
          <div className={styles.sectionBox}>
            {isEditing ? (
              <>
                <p className={styles.descriptionTitle}>Описание</p>
                <textarea
                  className={styles.textarea}
                  defaultValue={selectedAdvertisement?.description}
                  onChange={(e) =>
                    handleFieldChange('description', e.target.value)
                  }
                  placeholder="Описание"
                />
              </>
            ) : (
              <>
                <p className={styles.descriptionTitle}>
                  {loading ? <Skeleton width={200} /> : 'Описание'}
                </p>
                <p>
                  {loading ? (
                    <Skeleton width={400} count={16} />
                  ) : (
                    selectedAdvertisement?.description
                  )}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertisementDetail;
