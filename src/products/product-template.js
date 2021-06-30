import { Link } from "react-router-dom";

const ProductTemplate = (props) => {
    const link = `/${props.id}`;
    const src = `${props.image}`;
    return (
        <div key={props.id} style={{ display: "flex",height:"350px", position: "relative", flexDirection: "column", padding: "100px 0 40px 40px", width: "300px" }}>
            <div style={{ display: "flex", justifyContent: "center"}}>
                <img width="200px" height="250px" src={src}></img>
            </div>
            <div style={{display: "flex", textAlign: "center" ,flexDirection: "column"}}>
                <p> {props.title} </p>
                <p> {props.price} € </p>
                <Link style={{position:"absolute", bottom:"10px", left: "42%" }}to={link}> <button> See product </button></Link>
            </div>

        </div>
    )
}

export default ProductTemplate;