import { FormProvider, useForm } from 'react-hook-form'

import { PokerPlanningContainer } from './Pages/PokerPlanning'
import { defaultValuesAppFormValues } from './App/constants'

import { TAppFormValues } from './App/types'

import './App.css'

function App() {
    const methods = useForm<TAppFormValues>({
        defaultValues: defaultValuesAppFormValues
    })

    return (
        <FormProvider {...methods}>
            <PokerPlanningContainer />
        </FormProvider>
    )
}

export default App
