import React from 'react';
import { Stack, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function SectionDesc(props) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/perfil/${props.user_id}`);
    };

    return (
        <div className='container p-5'>
            <h3 className='fw-bold ps-3'>{props.tittle}</h3>
            <Link to={`/perfil/${props.user_id}`}>
                <h5 className='ms-3'>{props.nombre}</h5>
            </Link>

            {/* <Stack gap={2} className='' direction='horizontal'> */}
            <div className='row'>
                <div className='col-xl-6 col-12'>
                    <div className='text-wrap'>
                        <p className='text-break text-start p-3'>
                            {props.desc}
                        </p>
                    </div>
                </div>
                <div className='col-xl-6 col-12 '>
                    <div className='ps-xl-5 pb-3 text-center'>
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
                </div>
            </div>
            {/*  </Stack> */}
            <div className='pt-5'>
                <hr />
            </div>
        </div>
    );
}
