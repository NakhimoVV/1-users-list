import React from 'react'
import PropTypes from 'prop-types'
import Qualitie from './qualitie'
import { useQualities } from '../../../hooks/useQualities'

const QualitiesList = ({ arrayId }) => {
    const { isLoading, getQuality } = useQualities()
    const qualities = arrayId.map((qualId) => getQuality(qualId))

    if (!isLoading) {
        return (
            <>
                {qualities.map((qual) => (
                    <Qualitie key={qual._id} {...qual} />
                ))}
            </>
        )
    } else return 'Loading ...'
}
QualitiesList.propTypes = {
    arrayId: PropTypes.array
}
export default QualitiesList
