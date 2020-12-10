import { useState } from "react";
import { useLocation } from "react-router-dom";

import { FilterProps, IRoleRankClass, IMember } from "../types";
import { ucFirst } from "../helper";

import "../../css/filter.css";

import Member from "../components/Member";

const Filter = ({ members, filter, loading, error }: FilterProps) => {
    const location = useLocation().pathname.slice(1);
    const locationNameReady: string =
        location.slice(0, -1) === "classe" ? "class" : location.slice(0, -1);
    const [selectedFilter, setFilter] = useState<string>("");

    const filteredMembers = members.filter(
        (mem: IMember) => mem[locationNameReady] === selectedFilter
    );
    return (
        <main className="wrapper">
            <header>
                <h1 className="pink">{ucFirst(locationNameReady)} Overview</h1>
            </header>

            {filter.length ? (
                <form>
                    <select
                        className="pink"
                        value={selectedFilter}
                        onChange={e => setFilter(e.target.value)}
                    >
                        <option value="">
                            Please Select a {ucFirst(locationNameReady)}
                        </option>
                        {filter.map((cl: IRoleRankClass) => (
                            <option key={cl.id} value={cl.title}>
                                {ucFirst(cl.title)}
                            </option>
                        ))}
                    </select>
                </form>
            ) : null}

            {filteredMembers.length ? (
                <section className="flex">
                    {filteredMembers.map((member: IMember) => (
                        <Member key={member.id} member={member} />
                    ))}
                </section>
            ) : null}

            {loading && <p className="pink">Loading...</p>}

            {error && <p className="pink">{error}</p>}
        </main>
    );
};

export default Filter;
