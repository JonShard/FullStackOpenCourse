const CourseParts = ({ parts }) => {
  return (
    parts.map(part =>
      <tr key={part.id}>
        <td>{part.name}</td>
        <td>{part.exercises}</td>
      </tr>
    )
  )
}

const CourseSum = ({ parts }) => {
  const sum = parts.map(part => part.exercises).reduce((a, b) => a + b, 0)
  return (
    <b>total of {sum} exercises</b>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <h2>{course.name}</h2>
      <table>
        <tbody>
          <CourseParts parts={course.parts} />
        </tbody>
      </table>
      <CourseSum parts={course.parts} />
    </div>
  )
}

export default Course