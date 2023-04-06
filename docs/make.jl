push!(LOAD_PATH, "../src/")
push!(LOAD_PATH, "../SnowflakePlots.jl/src/")

using Documenter
using Snowflake
using SnowflakePlots

DocMeta.setdocmeta!(
    Snowflake, 
    :DocTestSetup, 
    quote
        using Snowflake
        include("../test/mock_functions.jl")
        requestor=MockRequestor(request_checker,post_checker)
        client = Client(host="http://example.anyonsys.com",user="test_user",access_token="not_a_real_access_token",requestor=requestor);
    end; 
    recursive = true
)
DocMeta.setdocmeta!(SnowflakePlots, :DocTestSetup, :(using Snowflake, SnowflakePlots);
    recursive = true)
uuid_regex = r"[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}"
makedocs(
    sitename = "Snowflake",
    format = Documenter.HTML(prettyurls = get(ENV, "CI", nothing) == "false"),
    modules = [Snowflake, SnowflakePlots],
    pages = [
        "Home" => "index.md",
        "Quantum Computing With Snowflake" => ["Basics" => "qc/basics.md"],
        #"Simulating Quantum Systems" => "simulating_quantum_systems.md",            
        "Library" => "library.md",
    ],
    doctestfilters = [uuid_regex],
    strict = true,
    checkdocs = :exports
)
