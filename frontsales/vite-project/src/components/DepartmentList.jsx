function DepartmentList({departments}) {
return(
    <ul>
        {departments.map(dep => (
            <li key={dep.id}>{dep.name}</li>
        ))}
    </ul>
)
}

export default DepartmentList;