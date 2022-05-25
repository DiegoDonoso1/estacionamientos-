import React from 'react';
import { Image } from 'react-bootstrap';
import Footer from '../components/Footer';

export default function AboutPage() {
    return (
        <>
            <div>
                <div>
                    <section
                        className='pb-3 container-fluid'
                        style={{ backgroundColor: '#E5E5E5' }}
                    >
                        <div className='row align-items-center'>
                            <div className='row align-items-center'>
                                <Image
                                    className='m-5 mx-auto d-block img-fluid '
                                    style={{ width: '25rem', height: '20rem' }}
                                    src='https://images.pexels.com/photos/7821937/pexels-photo-7821937.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
                                />
                                <div className='pt-3 pb-3 pe-4 ps-4 col-xl-6  col-12'>
                                    <h3>Terminos y condiciones</h3>
                                    <p>
                                        Lorem ipsum dolor sit amet Lorem ipsum
                                        dolor sit amet, consectetur adipiscing
                                        elit. Cras eget sagittis tellus, eu
                                        euismod purus. Nam vehicula massa eget
                                        nulla tincidunt, id venenatis velit
                                        ullamcorper. Nulla quam metus, auctor
                                        vel diam quis, egestas sagittis risus.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div className='container-fluid pt-4 pb-4'>
                    <section
                        className='pt-5 pb-3 pe-5 ps-5'
                        style={{ backgroundColor: '#FFFF' }}
                    >
                        <h3>Lorem ipsum dolor sit amet</h3>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Cras eget sagittis tellus, eu euismod purus. Nam
                        vehicula massa eget nulla tincidunt, id venenatis velit
                        ullamcorper. Nulla quam metus, auctor vel diam quis,
                        egestas sagittis risus. Suspendisse vitae suscipit sem,
                        sed consectetur nibh. Aliquam erat volutpat. Integer nec
                        pellentesque urna. Sed risus mauris, faucibus sed
                        euismod ut, vulputate eu diam. Nam nec urna blandit,
                        rutrum nisi in, egestas odio. Duis id diam quis turpis
                        consectetur dignissim ut in mauris.
                    </section>
                    <hr />
                    <section
                        className=' pt-5 pb-3 pe-5 ps-5'
                        style={{ backgroundColor: '#FFFF' }}
                    >
                        <h3>Lorem ipsum dolor sit amet</h3>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Cras eget sagittis tellus, eu euismod purus. Nam
                        vehicula massa eget nulla tincidunt, id venenatis velit
                        ullamcorper. Nulla quam metus, auctor vel diam quis,
                        egestas sagittis risus. Suspendisse vitae suscipit sem,
                        sed consectetur nibh. Aliquam erat volutpat. Integer nec
                        pellentesque urna. Sed risus mauris, faucibus sed
                        euismod ut, vulputate eu diam. Nam nec urna blandit,
                        rutrum nisi in, egestas odio. Duis id diam quis turpis
                        consectetur dignissim ut in mauris.
                    </section>
                    <hr />
                    <section
                        className='pt-5 pb-3 pe-5 ps-5'
                        style={{ backgroundColor: '#FFFF' }}
                    >
                        <h3>Lorem ipsum dolor sit amet</h3>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Cras eget sagittis tellus, eu euismod purus. Nam
                        vehicula massa eget nulla tincidunt, id venenatis velit
                        ullamcorper. Nulla quam metus, auctor vel diam quis,
                        egestas sagittis risus. Suspendisse vitae suscipit sem,
                        sed consectetur nibh. Aliquam erat volutpat. Integer nec
                        pellentesque urna. Sed risus mauris, faucibus sed
                        euismod ut, vulputate eu diam. Nam nec urna blandit,
                        rutrum nisi in, egestas odio. Duis id diam quis turpis
                        consectetur dignissim ut in mauris.
                    </section>
                    <hr />
                    <section
                        className='pt-5 pb-3 pe-5 ps-5'
                        style={{ backgroundColor: '#FFFF' }}
                    >
                        <h3>Lorem ipsum dolor sit amet</h3>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Cras eget sagittis tellus, eu euismod purus. Nam
                        vehicula massa eget nulla tincidunt, id venenatis velit
                        ullamcorper. Nulla quam metus, auctor vel diam quis,
                        egestas sagittis risus. Suspendisse vitae suscipit sem,
                        sed consectetur nibh. Aliquam erat volutpat. Integer nec
                        pellentesque urna. Sed risus mauris, faucibus sed
                        euismod ut, vulputate eu diam. Nam nec urna blandit,
                        rutrum nisi in, egestas odio. Duis id diam quis turpis
                        consectetur dignissim ut in mauris.
                    </section>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </>
    );
}
