import * as React from 'react';
import { fetchDogFacts, DogFactType } from './dog-facts';

import { Loading } from './Loading';


const Fact = ({ fact }: { fact: string }) => {
  return (
    <article className="dog-fact">
      <h3>Dog Fact</h3>
      <p>{fact}</p>
    </article>
  );
};

const App = () => {
  const [facts, setFacts] = React.useState<DogFactType[]>([]);
  const [loading, setLoading] = React.useState(true);


  React.useEffect(() => {
    fetchDogFacts(4).then((facts) => {

      setTimeout(() => {

        setFacts(facts);
        setLoading(false);
      }, 5000);

    });

  }, []);



  if (loading) {
    return <Loading />
  }
  else {
  return (
    <main>
      <section>

        {facts.map((fact, index) => (
          <Fact key={index} fact={fact.fact} />
        ))}

      </section>
    </main>
  );
        }
};

export default App;
