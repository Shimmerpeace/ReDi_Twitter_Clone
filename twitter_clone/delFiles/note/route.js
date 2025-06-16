import { NextResponse } from "next/server"; // this is used to create HTTP responses in API routes or server functions
import fs from "node:fs/promises"; // Imports the Node.js file system module with promise support, allowing you to use await with file operations.


/**
 * @param {NextRequest} request
*/

export async function POST(request) {
  // In Next.js API routes, this handles incoming HTTP POST requests.
  try {
    const { tweet } = await request.json(); // Reads and parses the incoming request body as JSON.
    console.log("Received input:", tweet); // Log the input to the server console for debugging.

    // Write the  received "text" to note.txt in the project root
    await fs.writeFile("note.txt", tweet, "utf8"); // 'utf8': Specifies the text encoding.
// fs.writeFileSync("./programming.txt", "this is an example", { encoding: "utf8", });
    return NextResponse.json({ status: "success" });
    //  return NextResponse.json({tweet});
  } catch (error) { // error hamdling
    console.error(error);
    // Sends a JSON response and HTTP status code 500 (Internal Server Error).
    return NextResponse.json( 
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}
// This is a simple API endpoint for saving posted text to a file on the server.
// this is how you write a simple route to the backend using next.js
