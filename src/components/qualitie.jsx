const Qualitie = ({ name, color }) => {
    const setQualsClasses = () => {
        let classes = 'm-1 badge bg-'
        classes += color
        return classes
    }
    return <span className={setQualsClasses()}>{name}</span>
}
export default Qualitie
