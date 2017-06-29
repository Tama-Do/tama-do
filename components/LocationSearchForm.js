import React, { Component } from 'react'
import { StyleSheet, View, Switch, Slider, DatePickerIOS, Picker, PickerIOS } from 'react-native'
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form'
import GooglePlacesWidget from './GooglePlacesWidget'



class FormView extends Component  {
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
        onSubmit={(isValid, values) => {
            if (isValid) {
                console.log('coords', values.locationSearch.details.geometry.location, 'place', values.locationSearch.details.address_components)
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