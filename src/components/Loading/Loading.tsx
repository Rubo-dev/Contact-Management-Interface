import {FC} from 'react';

interface LoadingProps {
    text: string;
    className?: string;
}

const Loading:FC<LoadingProps> = ({text, className}) => {
    return (
        <div className={className}>{text}</div>
    );
};

export default Loading;