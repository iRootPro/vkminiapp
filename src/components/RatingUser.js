import React from 'react';

const RatingUser = (props) => {
    return (
        <div>
            {props.index}. <img src={props.avatar} alt=""/> {props.firstName} {props.lastName} {props.coin}
        </div>
    );
};

export default RatingUser;
