import React from 'react';
import { Stack, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';

export default function SectionDesc(props) {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/perfil/${props.idEstacionamiento}`);
    };

    return (
        <div className='container p-5'>
            <h3 className='fw-bold ps-3'>{props.tittle}</h3>
            <Link to={`/perfil/${id}`}>
                <h5 className='ms-3'>{props.nombre}</h5>
            </Link>

            <Stack gap={2} className='' direction='horizontal'>
                <div className='me-auto text-wrap' style={{ width: '50rem' }}>
                    <p className='text-break text-start p-3'>{props.desc}</p>
                </div>
                <div className='ps-5 pb-3'>
                    <Button
                        onClick={handleClick}
                        style={
                            ({ padding: 'auto' },
                            { fontSize: '35px' },
                            { backgroundColor: 'rgb(255,66,77)' },
                            { boxShadow: 'none' })
                        }
                        className=' rounded-pill '
                        size='lg'
                        variant='danger'
                    >
                        Contacto
                    </Button>
                </div>
            </Stack>
            <div className='pt-5'>
                <hr />
            </div>
        </div>
    );
}
