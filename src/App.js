import './App.css';
import styled from 'styled-components';
import LateMarkRenderer from './Components/LateMarkRender';

// {i}Inline latex{/i}
// {b}block latex{/b}
// {m}markdown with or without html{/m}
function App() {
  const markdown = String.raw`
  {m}
  Solve the following equations using **Gauss Siedel Method :**
  <div style="height:4px"></div> 
  {/m}

  {b} 12\text{x} + 3\text{y} + 2\text{z} = 2{/b}
  {b} 10\text{y} + \text{z} = 20 {/b}
  {b} \text{x} + 3\text{y} + 10\text{z} = 20{/b}
`;
  const Testing = styled.div`
padding: 1.2rem;
`;
  return (
    <Testing>
      <LateMarkRenderer input={markdown} />
      <div></div>
    </Testing>
  );
}

export default App;