import { Hero, SearchBar, CustomFilter, CarCard, ShowMore } from "@/components";
import { fuels, yearsOfProduction } from "@constants";
import { FilterProps } from "@types";
import { fetchCars } from "@utils";

export default async function Home({ searchParams }: { searchParams: FilterProps }) {
  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || ""  ,
    model: searchParams.model || "", 
    fuel: searchParams.fuel || "", 
    limit: searchParams.limit || 10, 
    year:searchParams.year || 2023, 
  });
  const isDataEmpty = !Array.isArray(allCars)
    || allCars.length < 1
    || !allCars;
  
  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width">
        <div className="flex flex-col items-start justify-start gap-y-2.5 text-black-100;">
          <h1 className="text-4xl font-bold ">
          Car Catalogue
        </h1>
        <p>
          Explore the Cars you might like
          </p>
        </div >
       
        <div className="mt-12 w-full flex-between items-center flex-wrap gap-5">
          <SearchBar />
        
        <div className="flex justify-start flex-wrap items-center gap-2">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars.map((car) => (<CarCard car={car} />))}
            </div>
            <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > allCars.length}
              
            />
          </section>
          
        ) : (
            <div className="home__error-container">
              <h2 className="text-black text-xl font-bold">Oops, no results</h2>
              <p>{allCars?.message}</p>
            </div>
            
        )}

        
      </div>
    </main>
  )
}
