import { useEffect, useState } from "react";
import API from "../api/axios";
import PoemCard from "../components/PoemCard";
import CreatePoem from "../components/CreatePoem";

export default function Home() {
  const [poems, setPoems] = useState([]);
  const [open, setOpen] = useState(false);

  const load = async () => {
    await API.get("/poems").then((res) => setPoems(res.data));
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <main className="page-shell">
      <section className="hero-panel fade-up p-5 sm:p-7">
        <p className="section-kicker !text-[#f4c7ae]">Today's grove</p>
        <div className="mt-3 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-black leading-tight sm:text-4xl">Where new poems take root.</h2>
            <p className="mt-3 max-w-xl text-base leading-7">
              Read what the community is writing, leave a line of encouragement, and add your own voice.
            </p>
          </div>
          <button className="create-poem-button" onClick={() => setOpen(true)}>
            + Create Poem
          </button>
        </div>
      </section>

      <CreatePoem open={open} setOpen={setOpen} refresh={load} />

      <section className="mt-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="section-kicker">Feed</p>
            <h3 className="text-xl font-extrabold text-[#26312c]">Latest poems</h3>
          </div>
          <span className="rounded-full border border-[#e6d9c8] bg-[#fffdf9] px-3 py-1 text-sm font-bold text-[#69746d]">
            {poems.length} posts
          </span>
        </div>

        <div className="stagger-list space-y-4">
          {poems.length === 0 ? (
            <div className="soft-card p-6 text-center text-[#69746d]">
              No poems yet. Start the first branch.
            </div>
          ) : (
            poems.map((poem) => <PoemCard key={poem._id} poem={poem} />)
          )}
        </div>
      </section>
    </main>
  );
}
