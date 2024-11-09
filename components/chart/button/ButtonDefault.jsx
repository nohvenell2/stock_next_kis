'use client'
function ButtonDefault({ title, indexState, stateCurrent, handleClick }) {
    return (
        <button
            onClick={() => handleClick(indexState)}
            style={{
                backgroundColor: stateCurrent === indexState ? '#2962FF' : '#f0f0f0',
                color: stateCurrent === indexState ? '#ffffff' : '#333333',
                border: 'none',
                padding: '8px 16px',
                margin: '0px 0rem',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight:'bolder',
            }}
        >
            {title}
        </button>
    )
}
export default ButtonDefault