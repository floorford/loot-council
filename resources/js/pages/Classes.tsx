import { useState } from "react";

import { ClassesProps, IRoleRankClass } from "../types";
import { ucFirst } from "../helper";

const Classes = ({ members, classes, loading, error }: ClassesProps) => {
    const [selectedClass, setClass] = useState<string>("");
    return (
        <main className="wrapper">
            <header>
                <h1 className="pink">Class Overview</h1>
            </header>

            {classes.length ? (
                <form>
                    <select
                        value={selectedClass}
                        onChange={e => setClass(e.target.value)}
                    >
                        <option value="">Please Select</option>
                        {classes.map((cl: IRoleRankClass) => (
                            <option key={cl.id} value={cl.title}>
                                {ucFirst(cl.title)}
                            </option>
                        ))}
                    </select>
                </form>
            ) : null}
        </main>
    );
};

export default Classes;
