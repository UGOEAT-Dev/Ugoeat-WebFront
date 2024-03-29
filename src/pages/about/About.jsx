import {useEffect} from "react";

export default function About()
{
    useEffect(() => {
        document.title = "A propos | UGOEAT";
    }, [])

    return (
        <div className="p-5 sm:mt-16">
            <div id="about" className="pb-10">
                <h2 className="text-left text-2xl font-bold pb-2 mb-2 border-b-4">A Propos de UGOEAT</h2>
                <p>Restauration en ligne au Cameroun dans l&apos;association du travail humain par excellence au meilleur de la technologie afin d&apos;aider tous les restaurants à proximité à Douala et Yaoundé et qualifiés à maximiser leurs performances, augmenter leurs profits et créer des expériences exceptionnelles et agréables pour leurs clients.</p>
            </div>
            <div id="" className="pb-10">
                <h2 className="text-left text-2xl font-bold pb-2 mb-2">Livraison rapide</h2>
                <p>Pas besoin de vous déplacer! Avec notre service optimal pour restaurants en ligne, aucun besoin de se déplacer! Le site de restauration UGOEAT fera le suivi de votre commande en ligne à votre place et peu importe où vous vous trouver, vous pouvez vous assurer que le repas sera servi à votre porte.</p>
            </div>
            <div className="pb-10">
                <h2 className="text-left text-2xl font-bold pb-2 mb-2">Toujours plus proche de vous</h2>
                <p>UGOEAT se nourrit des rencontres avec les chefs des meilleurs restaurants au Cameroun, de l’expérience de ses partenaires et du savoir-faire de ses équipes pour réinventer la réservation et la commande en ligne en Afrique dans le secteur de restauration, notamment à Douala et Yaounde. Le site de restauration en ligne UGOEAT veille à l&apos;impact positif de son entreprise sur l&apos;écosystème en restant fidèle à ses valeurs : excellence, bien-être et responsabilité.</p>
            </div>
        </div>
    )
}