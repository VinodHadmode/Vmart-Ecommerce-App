import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const Spinner = ({ loading }) => {
    const override = {
        display: 'block',
        margin: '0 auto',
        borderColor: 'blue',
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <ClipLoader
                color='blue'
                loading={loading}
                cssOverride={override}
                size={30}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
};

export default Spinner;
