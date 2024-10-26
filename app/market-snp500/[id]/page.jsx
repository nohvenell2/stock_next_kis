/* export function generateMetadata({params:{id}}){
    return ({
        title: `${id}`
    })
} */
const Page = ({params:{id}}) => {
    return (
        <div className="m-40 text-8xl">
            {`page params = ${id}`}
        </div>
    )
}
export default Page