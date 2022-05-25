import React, { useState } from 'react';
import FormEsta from '../components/Form';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import { Button } from 'react-bootstrap';
import { Route, Routes, useNavigate } from 'react-router-dom';

export default function Search() {
    const [address, setAddress] = useState('');
    const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
    const [hide, sethide] = useState(true);

    let navigate = useNavigate();

    const handleSelect = async (value) => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setAddress(value);
        setCoordinates(latLng);
    };

    const handleClick = () => {
        if (address.length > 0) {
            navigate('/formulario/continuar');
            sethide(false);
        } else {
            <div>hola</div>;
        }
    };

    return (
        <>
            <div>
                <PlacesAutocomplete
                    value={address}
                    onChange={setAddress}
                    onSelect={handleSelect}
                >
                    {({
                        getInputProps,
                        suggestions,
                        getSuggestionItemProps,
                        loading,
                    }) => (
                        <div>
                            {hide && (
                                <>
                                    <div className=''>
                                        <input
                                            {...getInputProps({
                                                placeholder: 'Type address',
                                            })}
                                        />
                                    </div>
                                    <div className='mt-2'>
                                        <Button onClick={handleClick}>
                                            continuar
                                        </Button>
                                    </div>
                                </>
                            )}

                            <div className='mt-2'>
                                {!hide && (
                                    <Routes>
                                        <Route
                                            path='/continuar'
                                            element={
                                                <FormEsta
                                                    coordinates={coordinates}
                                                    address={address}
                                                />
                                            }
                                        />
                                    </Routes>
                                )}
                            </div>

                            <div>
                                {loading ? <div>...loading</div> : null}

                                {suggestions.map((suggestion) => {
                                    const style = {
                                        backgroundColor: suggestion.active
                                            ? '#41b6e6'
                                            : '#fff',
                                    };

                                    return (
                                        <div
                                            {...getSuggestionItemProps(
                                                suggestion,
                                                {
                                                    style,
                                                }
                                            )}
                                        >
                                            {suggestion.description}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </PlacesAutocomplete>
            </div>
        </>
    );
}
