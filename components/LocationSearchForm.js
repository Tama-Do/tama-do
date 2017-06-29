import React, { Component } from 'react'
import { StyleSheet, View, Switch, Slider, DatePickerIOS, Picker, PickerIOS } from 'react-native'
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form'
import GooglePlacesWidget from './GooglePlacesWidget'
import database from '../firebase';



class FormView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userId : 1,
            currPetId : 1
        }
    }



    render() {
        return (
            <GiftedForm style={styles.form}
                formName='locationSearch'
            >
                <GooglePlacesWidget style={styles.googlePlaces}
                    name='locationSearch'
                    placeholder='Search for location'
                />
                <GiftedForm.SubmitWidget
                    title='Submit'
                    widgetStyles={{
                        submitButton: {
                            backgroundColor: '#2185D0',
                        }
                    }}
                    onSubmit={(isValid, values, validationResults, postSubmit = null) => {
                        if (isValid) {
                            let updates = {
                                latitude: values.locationSearch.details.geometry.location.lat,
                                longitude: values.locationSearch.details.geometry.location.lng
                            }
                            database.ref(`/users/${this.state.userId}/pets/${this.state.currPetId}`).update(updates)
                                .then(response => console.log("success response", response))
                                .catch(error => console.log("error is", error))

                            console.log('coords', values.locationSearch.details.geometry.location, 'place', values.locationSearch.details.address_components)
                            postSubmit()
                        }
                    }
                    } />
            </GiftedForm>
        )
    }
}

const styles = StyleSheet.create({
    form: {
    },
    button: {
    }
})

export default FormView