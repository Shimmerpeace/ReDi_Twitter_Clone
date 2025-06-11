import { makeSureDbIsReady } from "@/lib/dataBase";
import { Company } from "@/models/company";
import { CreateCompany } from "./create.js";

export default async function Showcompany() {
  await makeSureDbIsReady();

  const allCompanies = await Company.find({});
  console.log({ allCompanies });
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold my-4">Create a new company </h2>
      <CreateCompany />

      <h2 className="text-2xl font-bold my-4"> All companies</h2>
      {allCompanies.map((company) => (
        <div key={company._id} className="grid grid-cols-2 max-w-sm">
          <span>Name</span>
          <span>{company.name}</span>
          <span>industry</span>
          <span>{company.industry}</span>
          <span>Year</span>
          <span>{company.founded_year}</span>
        </div>
      ))}
    </div>
  );
}
