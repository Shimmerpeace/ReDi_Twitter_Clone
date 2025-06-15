import { NextResponse } from "next/server";
import { makeSureDbIsReady } from "@/lib/dataBase.js";
import { Company } from "@/models/company.js";

/**
  @param {NextRequest} request 
 */

export async function POST(request) {
  await makeSureDbIsReady();
  const { name, industry, founded_year } = await request.json();
  const company = await Company.create({ name, industry, founded_year });
  return NextResponse.json(company.toObject());
}