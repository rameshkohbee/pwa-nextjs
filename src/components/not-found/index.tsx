import styles1 from "@styles/styles1/Home.module.css";

export function NotFound(): JSX.Element {
    return (
        <div className={styles1.notfound}>
            <div className={styles1.fof}>
                <h1>Error 404</h1>
            </div>
        </div>
    );
}
