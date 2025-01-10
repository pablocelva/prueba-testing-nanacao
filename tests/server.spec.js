const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {

    //Testea que la ruta GET /cafes devuelve un status code 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto.
    it("GET /cafes", async () => {
        const response = await request(server).get("/cafes");

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        //expect(Array.isArray(response.body)).toBe(true);
        
        //Verifica que al menos hay un elemento en el arreglo
        expect(response.body.length).toBeGreaterThan(0);
        
        //Verifica que almenos un elemento del arreglo es un objeto
        //expect(response.body).toBeInstanceOf(Object);
        expect(response.body.some((elemento) => typeof elemento === "object" && elemento !== null)).toBe(true);

        //Verifica que el tipo de dato de cada elemento del arreglo es object
        expect(response.body.every((elemento) => typeof elemento === "object" && elemento !== null)).toBe(true);

        //No estaba seguro de cual de las dos opciones de verificacion del objeto seria la adecuada asi que como son solo objetos en el array puse ambas jaja

    });

    //Comprueba que se obtiene un código 404 al intentar eliminar un café con un id que no existe.
    it("DELETE /cafes/100", async () => {
        const response = await request(server)
        .delete("/cafes/90")
        .set("Authorization", "Bearer token_valido")

        expect(response.status).toBe(404);
    });

    //Prueba que la ruta POST /cafes agrega un nuevo café y devuelve un código 201.
    it("POST /cafes", async () => {
        const response = await request(server).post("/cafes").send({
            id: 5,
            name: "Nuevo café",
        });

        expect(response.status).toBe(201);
    });

    //Prueba que la ruta PUT /cafes devuelve un status code 400 si intentas actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload.
    it("PUT /cafes/:id", async () => {
        const response = await request(server).put("/cafes/2").send({
            id: 201,
            name: "Café modificado",
        });

        expect(response.status).toBe(400);
    });
});
