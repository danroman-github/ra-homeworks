import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadServices } from '../store/servicesSlice';
import { clearForm, cancelEditing } from '../store/formSlice';
import { clearSearch } from '../store/filterSlice';
import type { Service } from '../types';
import servicesListData from '../assets/servicesList.json';

const JsonActions: React.FC = () => {
    const dispatch = useDispatch();
    const services = useSelector((state: any) => state.services.items);

    const handleSaveToJson = () => {
        try {
            const dataToSave = {
                services: services,
                lastUpdated: new Date().toISOString(),
                totalCount: services.length
            };

            const jsonString = JSON.stringify(dataToSave, null, 2);
            const blob = new Blob([jsonString], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = 'servicesList.json';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            showNotification('✅ Список услуг сохранен в servicesList.json', 'success');
        } catch (error) {
            console.error('Ошибка при сохранении:', error);
            showNotification('❌ Ошибка при сохранении файла', 'error');
        }
    };

    const handleLoadFromJson = async () => {
        try {
            let servicesToLoad: Service[] = [];

            try {
                const response = await fetch('/servicesList.json');
                if (response.ok) {
                    const data = await response.json();
                    if (data.services && Array.isArray(data.services)) {
                        servicesToLoad = data.services;
                    } else if (Array.isArray(data)) {
                        servicesToLoad = data;
                    }
                }
            } catch (fetchError) {
                console.log('Файл не найден по URL, используем импортированный файл');
            }

            if (servicesToLoad.length === 0 && servicesListData) {
                if (servicesListData.services && Array.isArray(servicesListData.services)) {
                    servicesToLoad = servicesListData.services;
                } else if (Array.isArray(servicesListData)) {
                    servicesToLoad = servicesListData;
                }
            }

            if (servicesToLoad.length > 0) {
                const isValid = servicesToLoad.every(
                    service => service.name && typeof service.price === 'number' && service.id
                );

                if (isValid) {
                    dispatch(loadServices(servicesToLoad));
                    dispatch(clearForm());
                    dispatch(cancelEditing());
                    dispatch(clearSearch());
                    showNotification(`✅ Загружено ${servicesToLoad.length} услуг из servicesList.json`, 'success');
                } else {
                    showNotification('❌ Неверный формат данных в servicesList.json', 'error');
                }
            } else {
                showNotification('❌ Файл servicesList.json не найден или пуст', 'error');
            }
        } catch (error) {
            console.error('Ошибка при загрузке:', error);
            showNotification('❌ Ошибка при загрузке файла servicesList.json', 'error');
        }
    };

    const showNotification = (message: string, type: 'success' | 'error') => {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    };

    return (
        <div className="json-actions">
            <div className="json-actions-group">
                <button
                    className="json-btn json-btn-save"
                    onClick={handleSaveToJson}
                    title="Сохранить текущий список в файл servicesList.json"
                >
                    💾 Сохранить список
                </button>

                <button
                    className="json-btn json-btn-load"
                    onClick={handleLoadFromJson}
                    title="Загрузить список из файла servicesList.json"
                >
                    📂 Загрузить список
                </button>
            </div>
        </div>
    );
};

export default JsonActions;