
import ReactPaginate from 'react-paginate'
import {styled} from 'styled-components'

const Paginate = styled(ReactPaginate).attrs({
    activeClassName: 'active',
    hrefBuilder: (page, limit) => `?&page=${page}${limit ? `?limit=${limit}`: ''}`
})`
    margin: auto;
    width: fit-content;
    display: flex;
    flex-direction: row;
    gap: 5px;
    justify-content: space-between;
    list-style-type: none;
    padding: 1rem 0px;

    li a {
        border-radius: 50%;
        padding: 0.3rem 0.8rem;
        border: gray 1px solid;
        cursor: pointer;
    }
    li.previous a,
    li.next a,
    li.break a {
        border-color: transparent;
    }
    li.active a {
        background-color: var(--secondary-color);
        border-color: transparent;
        color: white;
        min-width: 32px;
    }
    li.disabled a {
        color: grey;
    }
    li.disable,
    li.disabled a {
        cursor: default;
    }
`;

export default Paginate