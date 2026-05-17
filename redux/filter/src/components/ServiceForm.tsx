import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import {
    setFormField,
    cancelEditing,
    clearForm,
    setValidationError,
    clearValidationErrors,
} from '../store/formSlice';
import { addService, updateService } from '../store/servicesSlice';

const ServiceForm: React.FC = () => {
    const dispatch = useDispatch();
    const { name, price, editingId, errors } = useSelector((state: RootState) => state.form);
    const services = useSelector((state: RootState) => state.services.items);

    const editingService = editingId ? services.find(s => s.id === editingId) : null;

    const validateForm = (): boolean => {
        let isValid = true;
        dispatch(clearValidationErrors());

        if (!name.trim()) {
            dispatch(setValidationError({ field: 'name', error: 'Название услуги обязательно' }));
            isValid = false;
        } else if (name.trim().length < 2) {
            dispatch(setValidationError({ field: 'name', error: 'Минимум 2 символа' }));
            isValid = false;
        }

        if (!price.trim()) {
            dispatch(setValidationError({ field: 'price', error: 'Цена обязательна' }));
            isValid = false;
        } else {
            const priceNum = parseFloat(price);
            if (isNaN(priceNum)) {
                dispatch(setValidationError({ field: 'price', error: 'Введите число' }));
                isValid = false;
            } else if (priceNum <= 0) {
                dispatch(setValidationError({ field: 'price', error: 'Цена > 0' }));
                isValid = false;
            }
        }

        return isValid;
    };

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const priceNum = parseFloat(price);

        if (editingId) {
            dispatch(updateService({ id: editingId, name: name.trim(), price: priceNum }));
            dispatch(clearForm());
        } else {
            dispatch(addService({ name: name.trim(), price: priceNum }));
            dispatch(clearForm());
        }
    };

    const handleCancel = () => {
        dispatch(cancelEditing());
    };

    return (
        <div className="service-form-container">
            {editingId && (
                <div className="editing-badge">
                    ✏️ Редактирование: {editingService?.name}
                    <button className="cancel-edit-btn" onClick={handleCancel}>Отмена</button>
                </div>
            )}

            <form onSubmit={handleSubmit} className="horizontal-form">
                <div className="form-field">
                    <label htmlFor="name">Название услуги</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => dispatch(setFormField({ field: 'name', value: e.target.value }))}
                        className={errors.name ? 'error' : ''}
                        placeholder="Введите название"
                    />
                    {errors.name && <div className="error-message-small">{errors.name}</div>}
                </div>

                <div className="form-field">
                    <label htmlFor="price">Цена</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => dispatch(setFormField({ field: 'price', value: e.target.value }))}
                        className={errors.price ? 'error' : ''}
                        placeholder="0"
                        step="0.01"
                    />
                    {errors.price && <div className="error-message-small">{errors.price}</div>}
                </div>

                <div className="form-button">
                    <button type="submit" className="btn-save">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ServiceForm;