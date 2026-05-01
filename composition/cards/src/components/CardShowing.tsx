import React from 'react';
import {
    Card,
    CardImage,
    CardBody,
    CardTitle,
    CardText,
    ColoredCard,
    CardButton
} from './Card';

const cardConfigs = {
    standard: [
        {
            col: 'col-md-4',
            type: 'image',
            props: {
                title: 'Заголовок карточки',
                text: 'Это пример текста карточки. Здесь можно разместить описание или любую другую информацию.',
                imageUrl: '/src/assets/ffffff.png',
                buttonText: 'Перейти'
            }
        },
        {
            col: 'col-md-4',
            type: 'simple',
            props: {
                title: 'Текстовая карточка',
                text: 'Пример карточки без изображения, содержащей только текстовое содержимое.',
                buttonText: 'Подробнее'
            }
        },
        {
            col: 'col-md-4',
            type: 'colored',
            props: {
                title: 'Цветная карточка',
                text: 'Пример карточки с цветным фоном и белым текстом.',
                buttonText: 'Действие'
            }
        }
    ]
};

const renderCard = (config: any, index: number) => {
    const { type, props, col } = config;

    const cardComponents = {
        image: () => (
            <Card>
                <CardImage src={props.imageUrl} alt={props.title} />
                <CardBody>
                    <CardTitle>{props.title}</CardTitle>
                    <CardText>{props.text}</CardText>
                    <CardButton>{props.buttonText}</CardButton>
                </CardBody>
            </Card>
        ),
        simple: () => (
            <Card>
                <CardBody>
                    <CardTitle>{props.title}</CardTitle>
                    <CardText>{props.text}</CardText>
                    <CardButton variant="outline-primary">{props.buttonText}</CardButton>
                </CardBody>
            </Card>
        ),
        colored: () => (
            <ColoredCard color="primary">
                <CardBody>
                    <CardTitle>{props.title}</CardTitle>
                    <CardText>{props.text}</CardText>
                    <CardButton variant="light">{props.buttonText}</CardButton>
                </CardBody>
            </ColoredCard>
        )
    };

    return (
        <div key={index} className={col}>
            {cardComponents[type as keyof typeof cardComponents]()}
        </div>
    );
};

const CardShowing: React.FC = () => {
    return (
        <div className="container py-5">
            <h1 className="mb-5 text-center">
                Карточки
            </h1>

            <div className="row g-4">
                {cardConfigs.standard.map((config, idx) => renderCard(config, idx))}
            </div>
        </div>
    )
};

export default CardShowing;